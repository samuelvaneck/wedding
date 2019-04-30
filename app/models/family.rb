class Family < ApplicationRecord
  has_one_attached :photo
  has_many :guests, dependent: :destroy
  has_one :message, dependent: :destroy

  validates :name, presence: true
  validates :email, uniqueness: true, allow_blank: true, if: :will_save_change_to_email?
  validates :uuid, uniqueness: true

  accepts_nested_attributes_for :guests
  accepts_nested_attributes_for :message

  scope :responded, -> { where(response: true).order(updated_at: :desc) }
  scope :not_responded, -> { where(response: false).order(updated_at: :desc) }

  def self.import(file)
    accepted_extensions = ['.xls', '.xlsx']
    return unless accepted_extensions.include? File.extname(file.original_filename).downcase

    spreadsheet = Roo::Spreadsheet.open(file)
    spreadsheet.each_with_pagename do |name, sheet|
      next unless name == 'Uitnodigingen'
      
      read_sheet sheet
    end
  end

  def qrcode
    qrcode = RQRCode::QRCode.new("https://www.bruiloftsamuelencorine.nl/?uuid=" + uuid)
    qrcode.as_svg(
      offset: 0, color: '000',
      shape_rendering: 'crispEdges',
      module_size: 3
    )
  end

  private

  def self.read_sheet(sheet)
    sheet.parse headers: true
    sheet.parse header_search: ['Huishouden', 'Gast', 'Dag gasten', 'Avond gasten', 'Kind', 'Dïeet', 'Notities', 'E-mailadres', 'Telefoonnummer']
    sheet.each_with_index(family: 'Huishouden', guest: 'Gast', day_guest: 'Dag gasten', email: 'E-mailadres') do |guest, idx|
      next if idx.zero?
      
      import_guest guest
    end
  end

  def self.import_guest(guest)
    return if guest[:guest].blank?

    email = Family.set_email guest
    family = guest[:family] ? Family.create!(name: guest[:family], email: email, response: false, uuid: SecureRandom.hex(3)) : Family.last
    Guest.find_or_create_by!(name: guest[:guest], day_guest: (guest[:day_guest] == 1 ? true : false), family: family)
  end

  def self.set_email(guest)
    guest[:email] == '-' ? nil : guest[:email]
  end
end

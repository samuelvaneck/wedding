class Family < ApplicationRecord
  has_one_attached :photo
  has_many :guests, dependent: :destroy
  has_one :message, dependent: :destroy

  validates :name, presence: true

  def self.import(file)
    accepted_extensions = ['.xls', '.xlsx']
    return unless accepted_extensions.include? File.extname(file.original_filename).downcase
    spreadsheet = Roo::Spreadsheet.open(file)
    spreadsheet.each_with_pagename do |name, sheet|
      next unless name == 'Uitnodigingen'
      read_sheet sheet
    end
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
    family = guest[:family] ? Family.create(name: guest[:family], email: guest[:email], response: false) : Family.last  
    Guest.create(name: guest[:guest], day_guest: (guest[:day_guest] == 1 ? true : false), family: family)
  end
end

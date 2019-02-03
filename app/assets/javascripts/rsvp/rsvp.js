class RSVP {
  constructor() {
    this._code = this.getUUID();
  }

  getUUID() {
    return localStorage.getItem("uuid");
  }

  setUUID(value) {
    localStorage.setItem("uuid", this._code);
    this._code = value;
  }

  code(value) {
    if (!arguments.length) return this.getUUID();
    this.setUUID(value);
    this._code = value;
    return this;
  }

  fillInCode() {
    const code = this._code.split("");
    let time   = 100;
    $(code).each((i, character) => {
      setTimeout(() => {
        $("#code-input-" + i).val(character);
        if (i == code.length-1) { $("#code-input-" + i).keyup(); }
      }, time)
      time += 100;
    });
  }

  resetCode() {
    localStorage.removeItem("uuid");
    location.reload();
  }
}

$(document).on("click", "#reset-rsvp-code", () => {
  let rsvp = new RSVP();
  rsvp.resetCode();
});

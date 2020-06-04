class Deal {
  constructor (orgObj) {
    this.id = orgObj.id
    this.name = orgObj.name
    this.cnpj = orgObj.cnpj
    this.inscricaoEstdual = orgObj.inscricaoEstdual
    this.address = orgObj.address_formatted_address
    this.address_street_number = orgObj.address_street_number
    this.address_sublocality = orgObj.address_sublocality
    this.address_postal_code = orgObj.address_postal_code
    this.address_admin_area_level_1 = orgObj.address_admin_area_level_1
    this.address_admin_area_level_2 = orgObj.address_admin_area_level_2
    this.cc_email = orgObj.cc_email
    this.itens = orgObj.itens
  }
}
module.exports = Deal

const axios = require('axios')

class PipeDriveRequest {
  async get (apiKey) {
    const organizations = []
    const url = `https://linkapi-sandbox3.pipedrive.com/v1/deals?status=won&start=0&api_token=${apiKey}`
    const response = await axios.get(url)
    const orgs = response.data.related_objects.organization

    for (const org in orgs) {
      const id = orgs[org].id
      const response = await this.getDetailsOrganization(apiKey, id)
      organizations.push(response.data)
    }
    const keyFields = await this.getCustomFieldsOrganization(apiKey)
    const deals = response.data.data
    const structueDeals = this.makeStructuredDeal(deals, organizations, keyFields)
    return structueDeals
  }

  async getDetailsOrganization (apiKey, id) {
    const url = `https://linkapi-sandbox3.pipedrive.com/v1/organizations/${id}?api_token=${apiKey}`
    const response = await axios.get(url)
    return response.data
  }

  async getCustomFieldsOrganization (apiKey) {
    const url = `https://linkapi-sandbox3.pipedrive.com/v1/organizationFields?api_token=${apiKey}`
    const response = await axios.get(url)
    const data = response.data.data
    let cnpjKey = null
    let ieKey = null
    data.reduce(function (param, elem) {
      if (elem.name === 'cnpj') {
        cnpjKey = elem.key
      }
      if (elem.name === 'inscricao_estadual') {
        ieKey = elem.key
      }
    })
    return {
      cnpj: cnpjKey,
      inscricaoEstdual: ieKey
    }
  }

  makeStructuredDeal (deals, organizations, keyFields) {
    const structuredDeals = []

    for (const org in organizations) {
      const orgObj = organizations[org]
      const dealsOfOrg = []

      for (const deal in deals) {
        const dealObj = deals[deal]
        if (dealObj.org_id.value === orgObj.id) {
          const dealStructured = {
            id: dealObj.id,
            title: dealObj.title,
            value: dealObj.value
          }
          dealsOfOrg.push(dealStructured)
        }
      }
      const structured = {
        id: orgObj.id,
        name: orgObj.name,
        cnpj: orgObj[keyFields.cnpj],
        inscricaoEstdual: orgObj[keyFields.inscricaoEstdual],
        address: orgObj.address_formatted_address,
        address_street_number: orgObj.address_street_number,
        address_sublocality: orgObj.address_sublocality,
        address_postal_code: orgObj.address_postal_code,
        address_admin_area_level_1: orgObj.address_admin_area_level_1,
        address_admin_area_level_2: orgObj.address_admin_area_level_2,
        cc_email: orgObj.cc_email,
        itens: dealsOfOrg
      }
      structuredDeals.push(structured)
    }
    return structuredDeals
  }
}
module.exports = PipeDriveRequest

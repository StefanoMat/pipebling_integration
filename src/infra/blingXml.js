const js2xmlparser = require('js2xmlparser')

class BlingXml {
  buildOrder (deal) {
    const order = [{
      cliente: {
        nome: deal.name,
        tipoPessoa: 'J',
        cpf_cnpj: deal.cnpj ? deal.cnpj : '',
        ie_rg: deal.inscricaoEstadual ? deal.inscricaoEstadual : '',
        endereco: deal.address,
        numero: deal.address_street_number,
        bairro: deal.address_sublocality,
        cep: deal.address_postal_code,
        cidade: deal.address_admin_area_level_2,
        uf: deal.address_admin_area_level_1,
        email: deal.cc_email
      },
      itens: []
    }]
    for (const item in deal.itens) {
      const itemObj = deal.itens[item]
      const structured = {
        item: {
          codigo: itemObj.id,
          descricao: itemObj.title,
          qtde: 1,
          vlr_unit: itemObj.value
        }
      }
      order[0].itens.push(structured)
    }
    const orderXml = js2xmlparser.parse('pedido', order[0])
    return orderXml
  }
}
module.exports = BlingXml

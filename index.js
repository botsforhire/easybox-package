const fetch = require('node-fetch')

class EasyBoxClient {
  constructor(boxHost = `https://easybox.bots.wtf`, boxID, auth = null) {
    this.boxHost = boxHost

    this.boxID = boxID
    this.boxAuthorization = auth
  }

  async newBox() {
    var b = await fetch(`${this.boxHost}/new`, {
      method: `POST`
    })

    if (!b.ok) {
      throw new Error(`Internal Server Error: Status Code ${b.status}`)
    }

    var j = await b.json()

    this.boxID = j.boxID

    return j
  }

  async get(collectionName){
    var b = await fetch(`${this.boxHost}/box/${this.boxID}/${collectionName}`, {
      method: `GET`,
      headers: {
        'Authorization': this.boxAuthorization
      }
    })

    if(!b.ok){
      throw new Error(`Internal Server Error: Status Code ${b.status}`)
    }

    var json = await b.json()

    return json
  }

  async insertOne(collectionName, data){
    var b = await fetch(`${this.boxHost}/box/${this.boxID}/${collectionName}`, {
      method: `POST`,
      headers: {
        'Authorization': this.boxAuthorization,
        'Content-Type': `application/json`
      },
      body: JSON.stringify(data)
    })

    if(!b.ok){
      throw new Error(`Internal Server Error: Status Code ${b.status}`)
    }

    var json = await b.json()

    return json
  }

  async insert(collectionName, data){
    var isArray = false

    if(data[0]){
      isArray = true
    }

    if(!isArray){
      return await this.insert(collectionName, data)
    }

    var b = await fetch(`${this.boxHost}/box/${this.boxID}/${collectionName}`, {
      method: `POST`,
      headers: {
        'Authorization': this.boxAuthorization,
        'Content-Type': `application/json`
      },
      body: JSON.stringify(data)
    })

    if(!b.ok){
      throw new Error(`Internal Server Error: Status Code ${b.status}`)
    }

    var json = await b.json()

    return json
  }

  async deleteOne(collectionName, documentID){
    var b = await fetch(`${this.boxHost}/box/${this.boxID}/${collectionName}/${documentID}`, {
      method: `DELETE`,
      headers: {
        'Authorization': this.boxAuthorization
      }
    })

    if(!b.ok){
      throw new Error(`Internal Server Error: Status Code: ${b.status}`)
    }

    return true
  }

  async updateOne(collectionName, documentID, newData){
    var b = await fetch(`${this.boxHost}/box/${this.boxID}/${collectionName}/${documentID}`, {
      method: `PUT`,
      headers: {
        'Authorization': this.boxAuthorization,
        'Content-Type': `application/json`
      },
      body: JSON.stringify(newData)
    })

    if(!b.ok){
      throw new Error(`Internal Server Error: Status Code: ${b.status}`)
    }

    return newData
  }

  async destroy(){
    var b = await fetch(`${this.boxHost}/box/${this.boxID}`, {
      method: `DELETE`,
      headers: {
        'Authorization': this.boxAuthorization,
        'Content-Type': 'application/json'
      }
    })

    if(!b.ok){
      throw new Error(`Internal Server Error: Status Code: ${b.status}`)
    }

    this.boxID = undefined
    this.boxHost = undefined
    this.boxAuthorization = undefined

    return true
  }
}

module.exports = EasyBoxClient
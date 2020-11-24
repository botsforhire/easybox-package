var easybox = require('./index.js')

console.log('starting')
async function test(){
  var client = new easybox()

  await client.newBox()
  var d = await client.get(`bots`)

  console.log(`testing create`)
  var r = await client.insertOne(`bots`, {
    id: `1`,
    name: `Bot Name`,
    token: `asdfasdfadfasdfasd`
  })

  var d = await client.get(`bots`)

  if(!d[0]){
    throw new Error(`Failed to create`)
  }
  
  console.log(`testing update`)
  await client.updateOne(`bots`, d[0]['_id'], {
    token: `nadlnfalsdnflandln`
  })

  var d = await client.get(`bots`)

  if(d[0].token != `nadlnfalsdnflandln`){
    throw new Error(`Failed to update.`)
  }

  console.log(`testing delete`)
  await client.deleteOne(`bots`, d[0]['_id'])

  var d = await client.get(`bots`)

  if(d[0]){
    throw new Error(`Failed to delete.`)
  }

  console.log('testing insert multiple')
  var a = await client.insert(`bots`, [
    {
      id: `1`,
      name: `Bot Name`,
      token: `asdfasdfadfasdfasd`
    },
    {
      id: `2`,
      name: `Bot 2`,
      token: `asdfasdfasdfasdf`
    }
  ])

  var d = await client.get('bots')

  if(d.length != 2){
    throw new Error(`Failed to insert multiple.`)
  }

  console.log(`All tests passed! Deleting box`)

  var d = await client.destroy()

  if(d != true){
    throw new Error(`Failed to delete box`)
  }


}

test()
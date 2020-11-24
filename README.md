## Easybox Node Package
This is a npm package created for easily interacting with [easybox](https://easybox.bots.wtf), control a database using only HTTP requests.


## Docs

### Creating a new client
The main file returns a class which is the client, you can create as much clients as you want. To start the client, you will need to provide it with two variables, the host of the easybox (default is https://easybox.bots.wtf) and the box id. Here is an example:

```js
const easybox = require('easybox')

// init a client
var client = new easybox('https://easybox.bots.wtf', 'box_id')

```

*P.S. If you require auth on your box you can put the auth key as another param (`var client = new easybox('https://easybox.bots.wtf', 'box_id', 'auth_key')`)*


If you want to generate a new bot instead you can do

```js
const easybox = require('easybox')

// init a client
var client = new easybox('https://easybox.bots.wtf')

var box = await client.newBox()

/*

{
    "ok": true,
    "boxID": "<box_id>",
    "boxURL": "https://easybox.bots.wtf/box/<box_id>",
    "createdAt": <created_at_>,
    "auth": null
}

*/
```


### Get keys in a collection

Once you have init the client, everything else is just basic functions. Use the ``.get('collection_name')`` to get the keys in a collection. 

```js
const easybox = require('easybox')

// init a client
var client = new easybox('https://easybox.bots.wtf')

var box = await client.newBox()

var keys = await box.get('collection_name')

/*

[]

Will return empty array

*/
```

### Insert a key in a collection

Adding a key to a collection is really easy too! Use the ``.insertOne('collection_name', { data })`` function! 

```js
const easybox = require('easybox')

// init a client
var client = new easybox('https://easybox.bots.wtf')

var box = await client.newBox()

var key = await box.insertOne('collection_name', {
  name: 'John Doe',
  age: 50,
  job: 'Game Developer',
  company: 'Innersloth'
})

/*

Will return 

{
  name: 'John Doe',
  age: 50,
  job: 'Game Developer',
  company: 'Innersloth',
  _id: '<document_id>'
}

*/
```

*P.S. You can also return an array in the ``.insert`` function to insert multiple keys at once!*

### Updating a key in a collection
When you insert a key in a collection, you will also get the document id of the key in ``_id``. Using that id you can also update the key. The ``.updateOne('collection_name', 'document_id', { data })`` can do this!


```js
const easybox = require('easybox')

// init a client
var client = new easybox('https://easybox.bots.wtf')

var box = await client.newBox()

var key = await box.insert('collection_name', {
  name: 'John Doe',
  age: 50,
  job: 'Game Developer',
  company: 'Innersloth'
})

/*

Will return 

{
  name: 'John Doe',
  age: 50,
  job: 'Game Developer',
  company: 'Innersloth',
  _id: '<document_id>'
}

*/

var updatedKey = await box.updateOne('collection_name', key['_id'], {
  age: 51,
  company: 'Epic Games'
})

/*

Will return 


{
  name: 'John Doe',
  age: 51,
  job: 'Game Developer',
  company: 'Epic Games',
  _id: '<document_id>'
}


*/
```

### Deleting a key in a collection
Just like how updating a key is really easy, deleting a key is too! Just use the ``.deleteOne('collection_name', 'box_id')`` function to delete a key.

```js
const easybox = require('easybox')

// init a client
var client = new easybox('https://easybox.bots.wtf')

var box = await client.newBox()

var key = await box.insert('collection_name', {
  name: 'John Doe',
  age: 50,
  job: 'Game Developer',
  company: 'Innersloth'
})


var b = await box.deleteOne('collection_name', key['_id'])

/*

returns a boolean

true

*/
```


# Contributing

When you make a change, run ``npm test`` to test your changes and make sure there are no errors **before** creating a pull request. 
# async-flag
Promise based flag for asynchronous condition, for javascript/Nodejs

```
npm i async-flag
```

# Basic
```javascript
const AsyncFlag = require('async-flag')
let flag = new AsyncFlag()

//Set the flag somewhere else
setTimeout(() => flag.set('hello'), 10)

//wait for the flag
let result = await flag.get() //result will be 'hello'
```

# Error case
```javascript
let flag = new AsyncFlag('my-conditiopn')

//Set the error somewhere else
setTimeout(() => flag.error('something wrong'), 10)

flag.get().catch(console.error) //prints 'something wrong'
```

# Timeout
```javascript
let flag = new AsyncFlag('myFlag')
setTimeout(() => flag.set('hello'), 500)

flag.get(10).catch(console.log)		//expected timeout, prints: "AsyncFlag timeout: myFlag"
flag.get(100).catch(console.log)	//expected timeout, prints: "AsyncFlag timeout: myFlag"
flag.get(1000).then(console.log).catch(console.error)	//expected resolve, prints "hello"
flag.get(1000).then(console.log).catch(console.error)	//expected resolve, prints "hello"
```

# Reset
```javascript
let flag = new AsyncFlag()
flag.set('hello')
assert('hello' === await flag.get())
flag.reset()  //reset the promise.
flag.set('hello3')
assert('hello3' === await flag.get())
```

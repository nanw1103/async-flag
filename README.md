# async-flag
Promise based flag for asynchronous condition

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
const AsyncFlag = require('async-flag')
let flag = new AsyncFlag('my-conditiopn')

//Set the error somewhere else
setTimeout(() => flag.error('something wrong'), 10)

flag.get().catch(console.error) //prints 'something wrong'
```
	
# Timeout
```javascript
const AsyncFlag = require('async-flag')

let flag = new AsyncFlag('myFlag')
setTimeout(() => flag.set('hello'), 500)

flag.get(10).catch(console.log)		//expected timeout, prints: "AsyncFlag timeout: myFlag"
flag.get(100).catch(console.log)	//expected timeout, prints: "AsyncFlag timeout: myFlag"
flag.get(1000).then(data => console.log('expected resolve:', data)).catch(console.error)
flag.get(1000).then(data => console.log('expected resolve:', data)).catch(console.error)
```

# Reset
```javascript
const AsyncFlag = require('async-flag')

let flag = new AsyncFlag()
setTimeout(() => flag.set('hello'), 500)

flag.get(10).catch(() => console.log('expected timeout'))
flag.get(100).catch(() => console.log('expected timeout'))
flag.get(1000).then(data => console.log('expected resolve:', data)).catch(console.error)
flag.get(1000).then(data => console.log('expected resolve:', data)).catch(console.error)
```
let flag = new AsyncFlag()
		flag.set('hello')
		flag.set('hello2')	//setting resolved flag will be ignored
		assert('hello' === await flag.get())
		flag.reset()
		flag.set('hello3')
		assert('hello3' === await flag.get())

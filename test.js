'use strict'
const assert = require('assert')
const AsyncFlag = require('./index.js')

describe('delay', function() {
	it('Basic', async function() {
		let flag = new AsyncFlag()	
		setTimeout(() => flag.set('hello'), 10)	
		let result = await flag.get()
		assert(result === 'hello')
	})
	
	it('Basic error', async function() {
		let flag = new AsyncFlag()	
		setTimeout(() => flag.error('XX'), 10)	
		try {
			await flag.get()
			assert(false)
		} catch (e) {
			assert(e === 'XX')
		}
	})
	
	it('Basic Timeout with name', async function() {
		let flag = new AsyncFlag('myFlag')	
		setTimeout(() => flag.set('hello'), 1000)
		try {
			await flag.get(10)
			assert(false)
		} catch (e) {
			assert(e.toString().indexOf('myFlag') > 0)
		}
	})
	
	it('Multiple resolve', async function() {
		let flag = new AsyncFlag()	
		setTimeout(() => flag.set('hello'), 10)
		assert('hello' === await flag.get())
		assert('hello' === await flag.get())
	})
	
	it('Resolve & reject', async function() {
		let flag = new AsyncFlag()	
		setTimeout(() => flag.set('hello'), 500)
		flag.get(10).then(() => assert(false)).catch(()=>0)
		flag.get(100).then(() => assert(false)).catch(()=>0)
		flag.get(1000).catch(() => assert(false))
		flag.get(1000).catch(() => assert(false))
	})
	
	it('Reset', async function() {
		let flag = new AsyncFlag()
		flag.set('hello')
		flag.set('hello2')	//setting resolved flag will be ignored
		assert('hello' === await flag.get())
		flag.reset()
		flag.set('hello3')
		assert('hello3' === await flag.get())
	})
})

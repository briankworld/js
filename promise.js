export class MyPromise {

    constructor(executor) {
        this.state = 'pending' 
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallbacks = [] 
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                this.onFulfilledCallbacks.forEach(cb => cb(value))
            }
        }

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(callback => callback(reason))
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value)
                    resolve(result)
                } catch(e) {
                    reject(e)
                }
            }

            const handleRejected = () => {
                try {
                    if (onRejected) {
                        const result = onRejected(this.reason)
                        resolve(result)
                    } else {
                        reject(this.reason)
                    }
                } catch(e) {
                    reject(e)
                }
            }

            if (this.reason === 'fulfilled') {
                handleFulfilled()
            } else if (this.state === 'rejected') {
                handleRejected();
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled)
                this.onRejectedCallbacks.push(handleRejected)
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }
}

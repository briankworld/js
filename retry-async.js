async function retry(fn, nums, timeout) {
    for (let i = 0; i < nums; i++) {
        try {
            let result = await fn()
            return result
        } catch(e) {
           if (i === nums -1) {
                throw e
           }
           await new Promise(resolve => setTimeout(resolve, timeout))
        }
    }
}

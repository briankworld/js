export function retry(fn, nums, timeout) {
    return new Promise((resolve, reject) => {
        const re = (remaining) => {
            fn().then(resolve)
                .catch((e) => { 
                    if (nums === 0) {
                        reject(e)
                    } else {
                        setTimeout(() => re(remaining - 1), timeout)
                    }
                })
        }
        re(nums)
    })
}
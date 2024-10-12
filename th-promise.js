export async function thFetch(urls = [], concurrency = 5) {
    const results = []
    const queue = []

    let index = 0
    let f_index = 0

    function f() {
        while(index < urls.length && f_index < concurrency) {
            const url = urls[index++]
            f_index++

            const p = fetch(url)
                .then((resp) => resp.json())
                .then((data) => results.push(data)) 
                .catch((e) => console.error(e))
                .finally(() => {
                   f_index--
                   f()
                })
            
            queue.push(p)
        }
    }

    f()
    await Promise.all(queue)
    return results
}

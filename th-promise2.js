export async function thFetch(urls = [], concurrency = 5) {
    let f_index = 0

    const queue = []

    for (const url of urls) {
        while(f_index >= concurrency) {
            await new Promise((r) => setTimeout(r, 100))
        }
        const p = fetchData(url)
        queue.push(p)
    }

    const result = await Promise.all(queue)
    return result

    async function fetchData(url) {
        f_index++

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('response was not ok')
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        } finally {
            f_index--;
        }
    }
}

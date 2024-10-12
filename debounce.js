export function debounce(fn, timeout) {
    let id = null
    return function(...args) {
        let context = this
        if (id) {
            clearTimeout(id)
        }
        id = setTimeout(() => fn.apply(context, args), timeout)
    }
}

/*
function search(query) {
    console.log(query)
}

debouncedSearch = debounce(search, 100)

document.getElementById('searchInput').addEventListener('input', function(e) {
  debouncedSearch(e.target.value)
})
*/
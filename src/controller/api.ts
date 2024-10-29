

export async function CreateUrlRequest(target_url: string) {
    return await fetch('/api', {
        method: "POST",
        headers:{
           'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'target_url': target_url,
        })
    })
}

export async function UpdateKey(key: string, newKey: string) {
    return await fetch('/api', {
        method: "PUT",
        headers:{
           'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'key': key,
            'new_key': newKey
        })
    })
}
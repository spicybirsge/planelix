const regex = /[^a-zA-Z0-9_-]/g

export default function filterUsernameCharacters(username) {
return username.toLowerCase().replace(regex, "")
}
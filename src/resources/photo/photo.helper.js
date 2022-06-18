
export const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/g;

export function getQueryParams(req){
    let {page=1, limit=10, skip=10, search} = req.query
            page = parseInt(page);
            limit = parseInt(limit);
            skip = parseInt(skip);
    return {page, limit, skip, search};
}



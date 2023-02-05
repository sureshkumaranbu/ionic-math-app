export interface Entry {
    id: string;
    title: string;
    description: string;
    date: string;
}

export function toEntry(doc): Entry {
    console.log({id: doc.id, ...doc.data()})
    return { id: doc.id, ...doc.data()};
}
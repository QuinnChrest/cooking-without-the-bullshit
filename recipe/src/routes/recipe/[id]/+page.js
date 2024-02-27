/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        recipe_id: params.id,
    };
}
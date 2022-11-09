const NORFAM_BACKEND =
  process.env.VUE_APP_APIURL || "https://nordiskfamiljebok.dh.gu.se/api";
const PAGE_SIZE = 20;

export async function search(edition, query, fulltext, page = 1) {
  const params = new URLSearchParams({
    v: edition,
    q: query,
    m: fulltext ? "t" : "k",
    offset: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });
  const url = `${NORFAM_BACKEND}/api/query/?${params}`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    count: data.length,
    items: data.map(formatHit),
  };
}

export async function getArticle(edition, id) {
  return fetch(`${NORFAM_BACKEND}/api/documents/${id}`)
    .then((response) => response.json())
    .then(formatHit);
}
export async function getSimilarTerms(query) {
  const url = `${NORFAM_BACKEND}/api/termsim/?q=${query}`;

  const formatResponse = async (response) =>
    (await response.json())
      .map(({ term_term, neighbors }) => ({
        term: term_term,
        neighbors: neighbors.map(({ term, similarity }) => ({
          // Unpack `term.term_id` to `term_id` etc.
          ...term,
          similarity,
        })),
      }))
      // Same order as query
      .sort((a, b) => query.indexOf(a.term) - query.indexOf(b.term));

  return [
    fetch(`${url}&v=1`).then(formatResponse),
    fetch(`${url}&v=2`).then(formatResponse),
  ];
}

function formatHit(hit) {
  return {
    id: hit.doc_id,
    title: hit.doc_keyword,
    summary: hit.doc_abstr,
    body: hit.doc_text && trimLineBreaks(hit.doc_text),
    suppl: hit.doc_suppl,
  };
}

function trimLineBreaks(txt) {
  return txt.replace(/(<br>\s*){3,}/, "<br><br>");
}

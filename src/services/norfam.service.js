const NORFAM_BACKEND = "https://nordiskfamiljebok.dh.gu.se/api";

export async function search(query, fulltext) {
  const mode = fulltext ? "t" : "k";
  const url = `${NORFAM_BACKEND}/api/query/?q=${query}&m=${mode}`;

  const formatResponse = async (response) =>
    (await response.json()).slice(0, 100).map(formatHit);

  return [
    fetch(`${url}&v=1`).then(formatResponse),
    fetch(`${url}&v=2`).then(formatResponse),
  ];
}

export async function getArticle(edition, id) {
  return fetch(`${NORFAM_BACKEND}/api/documents/${id}/?v=${edition}`)
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

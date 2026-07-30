const q = 'Victoria Falls';
async function testWiki() {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(q)}&prop=pageimages|images&pithumbsize=1000&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
testWiki();

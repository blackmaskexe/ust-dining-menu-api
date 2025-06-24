const sampleResponse = [];

const aiInstructions = `
I will paste the raw html content of a website, and you will format it as a JSON array containing json objects and constructs.
This is the html code for a website that contains the menu at campus locations at a University.
Your response should look like the following based on the content: ${JSON.stringify(
  sampleAIResponse
)}.
(Please note that this is just a skeleton response. Your response should contain all the information in the website, and not miss any entry for any item or day.
Your response should only contain the JSON object, and nothing else.
If something goes wrong, just return an empty JSON array, but you do have to always return valid json response.)
`;

# Crescendo Project Details
:dizzy: Built with Next.js, Vercel AI SDK, Pinecone

## Frontend
- [ ] Clean up MessageBubble.tsx
    - [ ] Why is there so much space between p and ol tags?
    - [ ] Open links in new tab: [Stackoverflow](https://stackoverflow.com/questions/69119798/react-markdown-links-dont-open-in-a-new-tab-despite-using-target-blank)
- [ ] Make input box grow upwards with longer message
- [ ] Make each tab a template

<details>
<summary>References</summary>
- [Nextjs Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

#### Vercel AI SDK
- [useChat hook](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#api)
- [Vercel AI SDK Chatbot](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot)

#### Effects
- [react-typewriter-effect](https://www.npmjs.com/package/react-typewriter-effect)
</details>

## Backend


## Pinecone
- Query across namespace for now, then implement finding which namespace to look for
    - [docs](http://docs.pinecone.io/guides/data/query-data#query-across-namespaces)
    - Is it a good idea to create namespace just with topics, do search, then choose namespace?
        - I think so, it's working well so far
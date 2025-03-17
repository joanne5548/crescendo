# Crescendo Project Details
:dizzy: Built with Next.js, Vercel AI SDK, Pinecone

## Frontend
- [ ] Clean up MessageBubble.tsx
    - [ ] Why is there so much space between p and ol tags?
    - [x] Open links in new tab: [Stackoverflow](https://stackoverflow.com/questions/69119798/react-markdown-links-dont-open-in-a-new-tab-despite-using-target-blank)
- [x] Move message bubbbles to each side
- [ ] Make input box grow upwards with longer message
- [ ] Make each tab a template
- [x] Make loading message

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
- [ ] Enhance namespace search
    - [ ] Add more data to each namespace
    - [ ] Perform lexical search
- [ ] Don't get context if similarity score is low
    - [ ] What threshold to use?
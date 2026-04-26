export default {
  async fetch(request, env) {

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    let message, history
    try {
      const body = await request.json()
      message = body.message
      history = body.history || []
    } catch (e) {
      return new Response(JSON.stringify({ reply: 'Invalid request.' }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }

    const systemPrompt = `You are an AI assistant for Goutham Chadalla Manjunath's portfolio website. Answer questions about Goutham professionally and concisely. Be friendly and helpful. Only answer questions related to Goutham's professional background, skills, experience, education, and projects. For unrelated questions, politely say you can only help with questions about Goutham.

Here is everything about Goutham:

PROFESSIONAL SUMMARY:
Goutham Chadalla Manjunath is a Head of AI Engineering and Software AI Engineer with 6+ years of deep domain expertise and 3+ years of professional experience shipping production-grade AI systems. He has worked at Harvard Medical School and currently leads AI Engineering at Liberty Home Guard — Forbes-awarded Best & Top Home Warranty for Customer Service in the USA. Expertise spans LLMs, RAG pipelines, agentic microservices, and production AI systems.

CONTACT:
- Email: gouthamcm.work@gmail.com
- Phone: 716-936-4857
- Location: Brooklyn, New York, USA
- LinkedIn: linkedin.com/in/gouthamchadallamanjunath
- GitHub: github.com/goutham45

WORK EXPERIENCE:

1. Head of AI Engineering (Software AI Engineer) | Liberty Home Guard | Brooklyn, New York | Oct 2024 - Present
Liberty Home Guard is a Forbes-awarded home warranty and insurance company.
- Voice AI Agent: FastAPI + ElevenLabs + AWS — handles technician diagnosis collection, cross-references coverage terms, negotiates service rates. Reduced claim processing time by 40%, driving $1.6M+ annual cost savings.
- Technician Onboarding Verification System: AWS Rekognition — liveness detection, face comparison, selfie-to-ID matching, document extraction for COI/Trade License/Driver's License. Saves 100+ manual hours/month, zero identity fraud.
- Databricks Genie RAG Platform: Natural language BI layer with custom semantic layer — executives query operational data in plain English.
- All deployed on AWS ECS/ECR, EC2, App Runner, ALB.

2. Research AI Engineer (AI & Data) | Harvard Medical School | Boston, MA | Feb 2024 - Oct 2024
- GenAI Transcription Pipeline: Python, OpenAI GPT, Whisper, Streamlit — transcribed physician interview recordings, reduced processing time by 50%.
- ML Signal Analysis: Neurokit2 ML models to analyze ECG, RR interval, PPG signals during surgical procedures. Sliding window HRV analysis. Benchmarked against Kubios.

3. Artificial Intelligence Engineer | Bragr Inc. | Boston, MA | Aug 2024 - Nov 2024
- RAG pipelines (LangChain, VectorDB, Azure CosmosDB, Azure OpenAI) for live ESPN sports data.
- Full-stack Bragr platform (React JS, Django) with GitHub Actions CI/CD.

4. Software Engineer | Newmark | Manhattan, New York | June 2023 - Jan 2024
- Natural language SQL generation chat UI (LangChain, Semantic Kernel, OpenAI LLMs).
- Dynamic property intelligence charts (MySQL + Matplotlib).

5. Software Developer | Valenta AI Private Limited | India | Jan 2022 - July 2022
- 5+ product interfaces (React.js, Python/Django). 84% system performance improvement via MySQL optimization.

SKILLS:
- Preferred Environment: GenAI, LLMs, Claude (Anthropic), RAG, Chatbots, Streamlit, NLP, PyGWalker, Databricks Genie
- Languages: Python, C++, JavaScript, SQL, Java, Go, R, Verilog, Visual Basic
- Cloud & DevOps: AWS (ECS, ECR, S3), Azure (OpenAI, CosmosDB), GCP, Docker, Kubernetes, GitHub Actions, UiPath
- Frameworks: FastAPI, React.js, Django, Node.js, Express.js, Angular, REST API, LlamaIndex, LangChain, Hugging Face
- Data & Databases: MySQL, PostgreSQL, MongoDB, DynamoDB, NoSQL, SSIS, SSMS, Pandas, Matplotlib

EDUCATION:
- MS Computer Science and Engineering | University at Buffalo, SUNY | Dec 2023 | GPA: 3.9
- BTech Computer Science and Engineering | Presidency University, India | July 2022

RESPONSE STYLE: Be concise, sharp, and impressive. Lead with a direct answer, support with specifics. Use markdown naturally — bold for emphasis, bullet points for lists. Keep responses under 150 words unless more detail is asked.`

    const geminiHistory = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }))

    const requestBody = {
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I'm Goutham's AI portfolio assistant. I'll answer questions about his professional background, skills, experience, and projects." }] },
        ...geminiHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    }

    let response, data
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      )
      data = await response.json()
    } catch (e) {
      return new Response(JSON.stringify({ reply: 'Network error reaching AI service: ' + e.message }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }

    if (response.status === 429) {
      return new Response(JSON.stringify({ reply: "I'm receiving too many requests right now. Please wait a moment and try again!" }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }

    if (!response.ok || !data.candidates || !data.candidates[0]) {
      return new Response(JSON.stringify({ reply: "Sorry, I couldn't process that right now. Please try again in a moment." }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't get a response. Please try again."

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}

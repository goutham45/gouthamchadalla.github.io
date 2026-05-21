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
Goutham Chadalla Manjunath is a computer science and AI engineering leader — from hands-on AI research at Harvard Medical School to serving as Head of AI Engineering at Liberty Home Guard, Forbes-awarded Best & Top Home Warranty for Customer Service in the USA. Built a foundation of 6+ years of deep domain expertise and 3+ years of professional experience shipping enterprise-grade AI systems. Leads the engineering team while staying hands-on in the code, designing system architecture, building microservices, and cloud deployments end to end. Expertise spans LLMs, RAG pipelines, problem identification and solving, and agentic microservices delivering systems that reduce costs, eliminate manual effort, and drive revenue growth at scale.

CONTACT:
- Email: gouthamcm.work@gmail.com
- Phone: 716-936-4857
- Location: Brooklyn, New York, USA
- LinkedIn: linkedin.com/in/gouthamchadallamanjunath
- GitHub: github.com/goutham45

WORK EXPERIENCE:

1. Head of AI Engineering | Liberty Home Guard | Brooklyn, New York | Jan 2026 - Present
- Architected and deployed enterprise-grade AI microservices using FastAPI + Python on AWS ECS/ECR, EC2, App Runner, and ALB; codified business logic from human expertise into systematic rules, leading a team of engineers to drive operational efficiency, accuracy, and cost savings.
- Deployed an Intelligent Voice AI agent (FastAPI, ElevenLabs, AWS) for claim diagnosis, resolutions, and technician negotiation; reduced claim processing time by 40%, driving $1.6M+ in annual cost savings and revenue growth.
- Embedded a Databricks Genie RAG platform with a custom semantic layer; enabled sales, revenue, and operations teams to identify bottlenecks and drive efficiency gains via natural language querying, replacing PowerBI reporting.

2. Software AI Engineer | Liberty Home Guard | Brooklyn, New York | Oct 2024 - Dec 2025
- Functioned as a forward deployed engineer — embedded with business stakeholders to map operational workflows, built an internal AI Recommendation Engine to streamline the claims resolution process, and customized AI systems to business requirements, driving revenue growth and operational efficiency; recognized with promotion to Head of AI Engineering.
- Built a Technician Onboarding Verification System using AWS Rekognition, OCR, pytesseract, and PyTorch for liveness detection, face comparison, selfie-to-ID matching, and COI, Trade License, Driver's License validation; streamlined verification for 500+ monthly onboardings, saving 160+ manual hours/month and $100K+/year in operational costs, eliminating fraud risk at scale.

3. Research AI Engineer | Harvard Medical School | Boston, MA | Feb 2024 - Oct 2024
- Designed and built a GenAI transcription and analysis pipeline using Python, OpenAI, Whisper, and Streamlit to process physician interview recordings; reduced processing time by 50% via targeted prompt engineering and pipeline optimization.
- Developed Python-based ML models using Neurokit to analyze ECG, RR interval, and PPG signals from live surgical procedures, studying the relationship between heart rate variability and patient outcomes.
- Benchmarked Neurokit against Kubios using side-by-side ML comparisons and optimized a sliding window technique to accelerate HRV analysis across multi-participant datasets, improving throughput and result consistency.

4. Founding AI Engineer (Part-time Contract) | Bragr Inc. | Boston, MA | Aug 2024 - Nov 2024
- Designed and built core AI features for a sports intelligence platform from inception; implemented RAG pipelines (LangChain, VectorDB, Azure CosmosDB, Azure OpenAI) to deliver real-time betting intelligence from live ESPN data.
- Led full-stack development of the Bragr platform (React JS, Django) and built CI/CD pipelines via GitHub Actions for automated data querying, web scraping, and AI response generation.

5. AI Software Engineer | Newmark | Manhattan, New York | June 2023 - Jan 2024
- Leveraged LangChain and Semantic Kernel to integrate external service plugins and built an interactive SQL generation chat UI using Python and OpenAI LLMs for natural language querying across business data.
- Built dynamic property intelligence charts using MySQL and Matplotlib to support real estate stakeholder decision-making.

6. Software Developer | Valenta AI Private Limited | Bengaluru, India | Jan 2022 - July 2022
- Designed and implemented 5+ enterprise product interfaces using React.js and Python/Django; refactored MySQL stored procedures and queries delivering an 84% improvement in system performance.

SKILLS:
- AI & ML Tools: GenAI, LLMs, Claude (Anthropic), RAG, Agentic AI, Chatbots, Streamlit, NLP, PyGWalker, Databricks Genie
- Languages: Python, C++, JavaScript, SQL, Java, Go, R, Verilog, Visual Basic
- Cloud & DevOps: AWS (ECS, ECR, S3), Azure (OpenAI, CosmosDB), GCP, Docker, Kubernetes, GitHub Actions, UiPath
- Frameworks: FastAPI, React.js, Django, Node.js, Express.js, Angular, REST API, RPA, LlamaIndex, LangChain, Hugging Face
- Data & Databases: MySQL, PostgreSQL, MongoDB, DynamoDB, NoSQL, SSIS, SSMS, Pandas, Matplotlib

EDUCATION:
- MS Computer Science and Engineering | University at Buffalo, SUNY | Dec 2023 | GPA: 3.9
- BTech Computer Science and Engineering | Presidency University, India | July 2022

CASE STUDIES:

LIBERTY HOME GUARD — Production AI Systems:

Voice AI Agent (Claim Intake, Resolution & Technician Negotiation):
Problem: Every claim required a live agent to manually diagnose issues, coordinate with technicians, and negotiate pricing. High costs, slow resolution, couldn't scale.
Solution: Architected a production Voice AI agent using FastAPI, ElevenLabs (real-time voice synthesis), and AWS. The agent conducts structured diagnostic conversations with technicians, identifies appliance failure type/severity, cross-references coverage terms, and negotiates service rates within approved cost bands. Deployed on AWS ECS/ECR with App Runner auto-scaling and ALB routing.
Impact: 40% reduction in claim processing time. $1.6M+ annual cost savings and revenue growth.

Technician Onboarding Verification System:
Problem: Verifying technician identity, trade license, COI, and Driver's License was 100% manual — causing delays, fraud risk, and scaling problems.
Solution: Built a zero-manual-intervention pipeline using AWS Rekognition, OCR, pytesseract, and PyTorch with liveness detection, face comparison, selfie-to-ID matching with confidence scoring, and automated document extraction parsing COI, Trade License, and Driver's License.
Impact: 500+ monthly onboardings streamlined. 160+ manual hours saved per month. $100K+/year in operational cost savings. Fraud risk eliminated at scale.

Databricks Genie RAG Platform:
Problem: Business users had no self-service access to operational data — every data request required filing an engineering ticket.
Solution: Embedded a natural language BI layer using Databricks Genie with a custom semantic layer, replacing PowerBI reporting. Executives query operational data in plain English and get accurate, data-backed answers instantly.
Impact: Decision lag reduced from days to seconds. Business users fully self-serving without engineering involvement.

AI Recommendation Engine:
Built an internal AI Recommendation Engine as a forward deployed engineer to streamline the claims resolution process — mapping operational workflows and customizing AI systems to business requirements, driving revenue growth and operational efficiency.

HARVARD MEDICAL SCHOOL — 2 Case Studies:

GenAI Transcription Pipeline:
Problem: Research team needed to transcribe and analyze hundreds of hours of physician interview recordings. Manual process was taking weeks per cycle.
Solution: Built an end-to-end GenAI pipeline: OpenAI Whisper for medical transcription, GPT with targeted prompt engineering to extract structured clinical insights, batched async processing and response caching for scale, and a Streamlit research UI.
Tech: Python, OpenAI GPT, Whisper, Streamlit, Pandas, PostgreSQL.
Impact: 50% reduction in processing time. Researchers fully self-serving analysis with zero engineering involvement.

ML Signal Analysis (HRV):
Problem: Existing workflow used Kubios (commercial tool) — manual, per-participant, no programmatic output, operator variability compromised reproducibility.
Solution: Built Python-based ML models using Neurokit to extract HRV metrics from ECG, RR interval, and PPG signals. Sliding window technique for consistent extraction. Parallelized multi-participant processing. Rigorous Kubios benchmarking study to validate accuracy.
Tech: Python, Neurokit, Kubios, Scikit-learn, Pandas, NumPy, Matplotlib.
Impact: Validated Neurokit as accurate replacement for Kubios. Significantly improved throughput. Eliminated operator variability.

BRAGR INC. — Sports Intelligence Platform:
Solution: RAG pipeline with LangChain, Azure CosmosDB (vector store), Azure OpenAI (GPT). Automated ESPN data scraping microservices continuously ingested live data. Full-stack platform: React JS frontend, Django REST API backend, GitHub Actions CI/CD.
Impact: Real-time hallucination-free betting intelligence. Zero manual data management post-deployment. Complete production platform shipped end-to-end.

NEWMARK — Real Estate Intelligence:
Solution: Conversational chat UI using LangChain and Semantic Kernel — users type questions in plain English, SQL is auto-generated and executed against live MySQL. Matplotlib-powered chart generation automatically converts query results into visual property intelligence reports.
Impact: Business stakeholders querying production data in plain English with zero SQL knowledge. Engineering bottleneck eliminated for routine data requests.

RESPONSE STYLE: Be concise, sharp, and impressive. Lead with a direct answer, support with specifics. Use markdown naturally — bold for emphasis, bullet points for lists. Keep responses under 150 words unless more detail is asked.`

    const geminiHistory = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }))

    const requestBody = {
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [
        ...geminiHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    }

    let response
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:streamGenerateContent?alt=sse&key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      )
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

    if (!response.ok) {
      const errText = await response.text()
      let errorDetail = errText
      try { errorDetail = JSON.parse(errText)?.error?.message || errText } catch {}
      return new Response(JSON.stringify({ reply: `Error (${response.status}): ${errorDetail}` }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }

    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop()
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const jsonStr = line.slice(6).trim()
            if (!jsonStr || jsonStr === '[DONE]') continue
            try {
              const chunk = JSON.parse(jsonStr)
              const text = chunk?.candidates?.[0]?.content?.parts?.[0]?.text
              if (text) await writer.write(encoder.encode(text))
            } catch {}
          }
        }
      } finally {
        await writer.close()
      }
    })()

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
      }
    })
  }
}

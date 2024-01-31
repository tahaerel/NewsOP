export default async function handler(req, res) {
  try {
    const { key } = req.body
    const openaiBaseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

    const response = await fetch(`${openaiBaseUrl }/models`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key && key != "" ? key : process.env.OPENAI_API_KEY}`,
      },
    });

    if (response.status === 401) {
      return res.status(500).json({ status: 500, context: response.body })
    } else if (response.status !== 200) {

      return res.status(500).json({ status: 500, context: response.body })
    }

    const data = await response.json();


    const models =  data.data.map((m)=>{
        if (m.id === 'ft:gpt-3.5-turbo-1106:personal::8n2oCykT' || m.id === 'ft:gpt-3.5-turbo-1106:personal::8n2oCykT') {
            return m.id;
        }
    }).filter(Boolean);

    return res.status(200).json(models)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500 })
  }
};

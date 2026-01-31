export default async function handler(req, res) {
  // Vercel 환경 변수에서 구글 시트 API URL을 읽어옵니다.
  const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_API_URL;
  
  if (!GOOGLE_SHEET_URL) {
    return res.status(500).json({ error: "GOOGLE_SHEET_API_URL 환경 변수가 설정되지 않았습니다." });
  }

  try {
    // 쿼리 스트링(시간 등)을 포함하여 구글 시트 호출
    const targetUrl = `${GOOGLE_SHEET_URL}${GOOGLE_SHEET_URL.includes('?') ? '&' : '?'}t=${Date.now()}`;
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // 브라우저에게 데이터 전달
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "데이터를 불러오는 중 오류가 발생했습니다." });
  }
}

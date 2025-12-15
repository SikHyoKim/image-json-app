import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [image, setImage] = useState(null);
  const [descs, setDescs] = useState([""]);
  const [answers, setAnswers] = useState([""]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleDescChange = (index, value) => {
    const newDescs = [...descs];
    newDescs[index] = value;
    setDescs(newDescs);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const addDesc = () => setDescs([...descs, ""]);
  const removeDesc = (index) =>
    setDescs(descs.filter((_, i) => i !== index));

  const addAnswer = () => setAnswers([...answers, ""]);
  const removeAnswer = (index) =>
    setAnswers(answers.filter((_, i) => i !== index));

  const handleSave = () => {
    if (
      !image ||
      descs.some((d) => !d.trim()) ||
      answers.some((a) => !a.trim())
    ) {
      alert("이미지와 모든 텍스트를 입력해주세요!");
      return;
    }

    const jsonData = {
      image_Path: image.name,
      prompt: descs,
      answers: answers,
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container bg-white shadow p-5 rounded-4">
        <div className="row g-4 align-items-center">

          {/* 왼쪽: 이미지 업로드 */}
          <div className="col-md-6 text-center">
            <h4 className="mb-3 fw-bold text-secondary">이미지 업로드</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control mb-3"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}
          </div>

          {/* 오른쪽: 입력 영역 */}
          <div className="col-md-6">
            <h4 className="mb-3 fw-bold text-secondary">입력 내용</h4>

            {/* 이미지 설명 */}
            <div className="mb-4">
              <label className="form-label">프롬프트</label>
              {descs.map((desc, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`설명 ${index + 1}`}
                    value={desc}
                    onChange={(e) =>
                      handleDescChange(index, e.target.value)
                    }
                  />
                  {descs.length > 1 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeDesc(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={addDesc}
              >
                + 설명 추가
              </button>
            </div>

            {/* 답변 */}
            <div className="mb-4">
              <label className="form-label">답변</label>
              {answers.map((answer, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`답변 ${index + 1}`}
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(index, e.target.value)
                    }
                  />
                  {answers.length > 1 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeAnswer(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={addAnswer}
              >
                + 답변 추가
              </button>
            </div>

            <button
              className="btn btn-primary w-100 py-2 fw-semibold"
              onClick={handleSave}
            >
              💾 JSON 파일로 저장
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

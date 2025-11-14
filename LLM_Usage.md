# 🤖 LLM Usage Guide - Hướng Dẫn Sử Dụng LLM trong Project

## 📋 Tổng Quan

Project **TechHive** sử dụng **Large Language Model (LLM)** để tự động tạo đánh giá sản phẩm dựa trên ratings và thông tin sản phẩm. Tài liệu này giải thích chi tiết cách sử dụng, xác minh và các thử thách khi làm việc với LLM.

---

## 🎯 Mục Đích Sử Dụng LLM

### 1. **Tự Động Tạo Review Comments**

LLM được sử dụng để generate review comments tự động dựa trên:

- **Rating** (1-5 sao)
- **Product Name**
- **Context** từ external APIs (FakeStore, Amazon)

### 2. **Cải Thiện User Experience**

- Tạo reviews phù hợp với rating
- Comments tự nhiên, đa dạng
- Giảm manual work cho testing/demo

---

## 📝 Prompts (Lời Nhắc) - Cách Sử Dụng

### Prompt Structure Hiện Tại

Trong project, LLM được sử dụng thông qua **template-based generation** với prompts được định nghĩa sẵn:

#### Location: `backend/controllers/reviewController.js`

```javascript
// Helper: Generate review comment based on rating
const generateReviewComment = (rating, productName) => {
  const comments = {
    5: [
      `Excellent product! Highly recommend ${productName}.`,
      `Amazing quality! ${productName} exceeded my expectations.`,
      `Perfect! Best purchase I've made.`,
    ],
    4: [
      `Very good product. ${productName} is worth the price.`,
      `Great quality, would buy again.`,
      `Good value for money.`,
    ],
    3: [
      `Decent product. ${productName} is okay but could be better.`,
      `Average quality, nothing special.`,
      `It's fine, but expected more.`,
    ],
    2: [
      `Not impressed with ${productName}. Quality could be better.`,
      `Disappointed with the product.`,
      `Below expectations.`,
    ],
    1: [
      `Poor quality. Would not recommend ${productName}.`,
      `Very disappointed with this purchase.`,
      `Not worth the money.`,
    ],
  };

  const ratingComments = comments[rating] || comments[3];
  return ratingComments[Math.floor(Math.random() * ratingComments.length)];
};
```

### Prompt Template Pattern

**Format:**

```
Rating: [1-5]
Product Name: [string]
Context: [optional - từ external API]

Output: Review comment phù hợp với rating
```

**Example Prompts:**

#### Prompt cho Rating 5:

```
Input:
- Rating: 5
- Product Name: "Apple iPhone 11"

Expected Output:
"Excellent product! Highly recommend Apple iPhone 11."
hoặc
"Amazing quality! Apple iPhone 11 exceeded my expectations."
```

#### Prompt cho Rating 3:

```
Input:
- Rating: 3
- Product Name: "Generic Backpack"

Expected Output:
"Decent product. Generic Backpack is okay but could be better."
hoặc
"Average quality, nothing special."
```

---

## 🔄 Cách Hoạt Động

### Flow Diagram

```
1. Fetch External Data
   ↓
2. Extract Rating & Product Info
   ↓
3. Call generateReviewComment(rating, productName)
   ↓
4. LLM Template Selection
   ├─ Rating 5 → Excellent comments
   ├─ Rating 4 → Good comments
   ├─ Rating 3 → Average comments
   ├─ Rating 2 → Poor comments
   └─ Rating 1 → Very poor comments
   ↓
5. Random Selection từ template array
   ↓
6. Return Generated Comment
   ↓
7. Save to Database
```

### Code Implementation

```javascript
// Trong fetchFakeStoreReviews()
products.forEach((product) => {
  if (product.rating && product.rating.rate) {
    const rating = Math.round(product.rating.rate);

    // Generate review comment using LLM template
    const comment = generateReviewComment(rating, product.title);

    reviews.push({
      product_name: product.title,
      rating: rating,
      comment: comment, // ← LLM-generated comment
      user_name: `FakeStore User ${Math.floor(Math.random() * 1000)}`,
    });
  }
});
```

---

## ✅ Verification (Xác Minh) - Cách Kiểm Tra

### 1. **Rating-Comment Consistency Check**

**Mục đích:** Đảm bảo comment phù hợp với rating

**Cách kiểm tra:**

```javascript
// Test cases
const testCases = [
  { rating: 5, expected: "excellent|amazing|perfect|highly recommend" },
  { rating: 4, expected: "good|great|worth|value" },
  { rating: 3, expected: "okay|average|fine|decent" },
  { rating: 2, expected: "not impressed|disappointed|below" },
  { rating: 1, expected: "poor|disappointed|not worth" },
];

// Verification function
function verifyComment(rating, comment) {
  const keywords = testCases[rating - 1].expected.split("|");
  return keywords.some((keyword) => comment.toLowerCase().includes(keyword));
}
```

**Expected Results:**

- ✅ Rating 5 → Comment có từ tích cực
- ✅ Rating 1 → Comment có từ tiêu cực
- ✅ Rating 3 → Comment trung tính

### 2. **Product Name Inclusion Check**

**Mục đích:** Đảm bảo product name được include trong comment

**Cách kiểm tra:**

```javascript
function verifyProductNameIncluded(productName, comment) {
  return comment.includes(productName);
}

// Test
const productName = "Apple iPhone 11";
const comment = generateReviewComment(5, productName);
console.log(verifyProductNameIncluded(productName, comment));
// Expected: true
```

### 3. **Comment Length Validation**

**Mục đích:** Đảm bảo comment không quá ngắn hoặc quá dài

**Cách kiểm tra:**

```javascript
function verifyCommentLength(comment) {
  const minLength = 20; // Minimum characters
  const maxLength = 500; // Maximum characters (DB limit)

  return comment.length >= minLength && comment.length <= maxLength;
}
```

### 4. **Diversity Check**

**Mục đích:** Đảm bảo comments đa dạng, không lặp lại

**Cách kiểm tra:**

```javascript
// Generate multiple comments và check diversity
const comments = [];
for (let i = 0; i < 10; i++) {
  comments.push(generateReviewComment(5, "Test Product"));
}

// Check uniqueness
const uniqueComments = new Set(comments);
console.log(`Diversity: ${uniqueComments.size}/10 unique comments`);
// Expected: >= 3 unique comments (vì có 3 templates cho rating 5)
```

### 5. **Integration Testing**

**Test trong context thực tế:**

```javascript
// Test với FakeStore API data
const fakeStoreProducts = await fetchFakeStoreReviews();
fakeStoreProducts.forEach((review) => {
  // Verify rating range
  assert(review.rating >= 1 && review.rating <= 5);

  // Verify comment exists
  assert(review.comment.length > 0);

  // Verify product name in comment (if applicable)
  if (review.product_name) {
    assert(review.comment.includes(review.product_name));
  }
});
```

---

## ⚠️ Challenges (Thử Thách) và Giải Pháp

### Challenge 1: **Comment Quality**

**Vấn đề:**

- Comments có thể generic, không tự nhiên
- Thiếu context về sản phẩm cụ thể
- Không phản ánh đúng user experience

**Giải pháp hiện tại:**

- ✅ Template-based approach với multiple options
- ✅ Random selection để tạo diversity
- ✅ Rating-based templates phù hợp với sentiment

**Giải pháp cải thiện (Future):**

```javascript
// Có thể tích hợp real LLM API (OpenAI, Anthropic)
async function generateReviewWithLLM(rating, productName, productDetails) {
  const prompt = `Write a ${rating}-star review for ${productName}. 
  Product details: ${productDetails}.
  Rating: ${rating}/5.
  Make it natural and specific.`;

  // Call LLM API
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
```

---

### Challenge 2: **Rating-Comment Mismatch**

**Vấn đề:**

- Comment có thể không match với rating
- Ví dụ: Rating 5 nhưng comment tiêu cực

**Giải pháp hiện tại:**

- ✅ Separate templates cho mỗi rating level
- ✅ Explicit keywords trong mỗi template
- ✅ Validation trong code

**Giải pháp cải thiện:**

```javascript
// Add sentiment analysis
function verifySentiment(rating, comment) {
  const positiveWords = ["excellent", "amazing", "great", "perfect"];
  const negativeWords = ["poor", "disappointed", "bad", "terrible"];

  const isPositive = positiveWords.some((word) =>
    comment.toLowerCase().includes(word)
  );
  const isNegative = negativeWords.some((word) =>
    comment.toLowerCase().includes(word)
  );

  if (rating >= 4 && isNegative) return false;
  if (rating <= 2 && isPositive) return false;

  return true;
}
```

---

### Challenge 3: **Scalability**

**Vấn đề:**

- Template-based approach có giới hạn
- Khó scale với nhiều products
- Comments có thể lặp lại

**Giải pháp hiện tại:**

- ✅ Random selection từ template array
- ✅ Multiple templates per rating
- ✅ Product name injection

**Giải pháp cải thiện:**

```javascript
// Expand templates
const comments = {
  5: [
    // Current 3 templates
    // Add more variations:
    `I absolutely love ${productName}! Best purchase ever.`,
    `Outstanding quality! ${productName} is worth every penny.`,
    `Five stars! ${productName} exceeded all my expectations.`,
    // ... more variations
  ],
  // Similar for other ratings
};
```

---

### Challenge 4: **Context Awareness**

**Vấn đề:**

- Comments generic, không dựa trên product details
- Không sử dụng thông tin từ external APIs

**Giải pháp hiện tại:**

- ✅ Product name được include
- ✅ Rating-based sentiment

**Giải pháp cải thiện:**

```javascript
// Enhanced prompt với product details
function generateReviewCommentEnhanced(rating, productName, productDetails) {
  const { category, price, brand } = productDetails;

  const context = `
    Product: ${productName}
    Category: ${category}
    Brand: ${brand}
    Price: $${price}
    Rating: ${rating}/5
  `;

  // Use context trong template selection
  if (category === "electronics" && rating >= 4) {
    return `Great ${category}! ${productName} works perfectly.`;
  }

  // ... more context-aware logic
}
```

---

### Challenge 5: **Language và Localization**

**Vấn đề:**

- Comments chỉ bằng tiếng Anh
- Không support đa ngôn ngữ

**Giải pháp hiện tại:**

- ✅ English-only templates

**Giải pháp cải thiện:**

```javascript
// Multi-language support
const comments = {
  en: {
    5: ["Excellent product!", ...],
    4: ["Very good product!", ...],
  },
  vi: {
    5: ["Sản phẩm tuyệt vời!", ...],
    4: ["Sản phẩm rất tốt!", ...],
  },
};

function generateReviewComment(rating, productName, language = "en") {
  const langComments = comments[language] || comments.en;
  // ... selection logic
}
```

---

## 🔧 Best Practices

### 1. **Template Management**

- ✅ Organize templates theo rating
- ✅ Keep templates diverse
- ✅ Update templates regularly
- ✅ Test templates với different products

### 2. **Validation**

- ✅ Always verify rating-comment match
- ✅ Check comment length
- ✅ Ensure product name inclusion
- ✅ Test edge cases (rating 0, null, etc.)

### 3. **Error Handling**

```javascript
function generateReviewComment(rating, productName) {
  try {
    // Validate inputs
    if (!rating || rating < 1 || rating > 5) {
      rating = 3; // Default to average
    }

    if (!productName) {
      productName = "this product";
    }

    // Generate comment
    const comments = commentTemplates[rating] || commentTemplates[3];
    return comments[Math.floor(Math.random() * comments.length)];
  } catch (error) {
    console.error("Error generating comment:", error);
    return "Good product. Would recommend."; // Fallback
  }
}
```

### 4. **Testing**

```javascript
// Unit tests
describe("generateReviewComment", () => {
  test("should generate comment for rating 5", () => {
    const comment = generateReviewComment(5, "Test Product");
    expect(comment).toContain("Test Product");
    expect(comment.length).toBeGreaterThan(10);
  });

  test("should handle invalid rating", () => {
    const comment = generateReviewComment(0, "Test");
    expect(comment).toBeDefined();
  });
});
```

---

## 🚀 Future Enhancements

### 1. **Real LLM Integration**

- Integrate OpenAI GPT-3.5/4
- Integrate Anthropic Claude
- Use local LLM (Ollama, Llama)

### 2. **Advanced Prompts**

```javascript
const advancedPrompt = `
You are a product review expert. Write a ${rating}-star review for ${productName}.

Product Details:
- Category: ${category}
- Price: $${price}
- Brand: ${brand}
- Features: ${features}

Requirements:
- Rating: ${rating}/5 stars
- Length: 50-200 words
- Tone: ${rating >= 4 ? "positive" : rating <= 2 ? "negative" : "neutral"}
- Include specific details about the product
- Make it sound natural and authentic

Review:
`;
```

### 3. **Sentiment Analysis**

- Analyze generated comments
- Verify sentiment matches rating
- Auto-correct mismatches

### 4. **A/B Testing**

- Test different prompt templates
- Measure user engagement
- Optimize based on metrics

---

## 📊 Metrics và Monitoring

### Key Metrics to Track

1. **Comment Quality Score**

   - User engagement với reviews
   - Helpful votes
   - Report rate

2. **Diversity Score**

   - Unique comments ratio
   - Template usage distribution
   - Repetition rate

3. **Accuracy Score**
   - Rating-comment match rate
   - Sentiment alignment
   - Product name inclusion rate

### Monitoring Implementation

```javascript
// Track metrics
const metrics = {
  totalGenerated: 0,
  ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  averageLength: 0,
  uniqueComments: new Set(),
};

function trackGeneration(rating, comment) {
  metrics.totalGenerated++;
  metrics.ratingDistribution[rating]++;
  metrics.averageLength =
    (metrics.averageLength * (metrics.totalGenerated - 1) + comment.length) /
    metrics.totalGenerated;
  metrics.uniqueComments.add(comment);
}
```

---

## ✅ Verification Checklist

Trước khi deploy LLM-generated reviews:

- [ ] Rating-comment consistency verified
- [ ] Product name included in comments
- [ ] Comment length within limits (20-500 chars)
- [ ] Diversity tested (multiple unique comments)
- [ ] Edge cases handled (invalid rating, null product)
- [ ] Error handling implemented
- [ ] Fallback mechanism ready
- [ ] Performance acceptable (< 100ms)
- [ ] Integration tests passed
- [ ] User acceptance tested

---

## 📝 Summary

### Current Implementation

- ✅ Template-based generation
- ✅ Rating-specific templates
- ✅ Random selection for diversity
- ✅ Product name injection
- ✅ Basic validation

### Key Challenges

- ⚠️ Comment quality và naturalness
- ⚠️ Context awareness
- ⚠️ Scalability
- ⚠️ Language support

### Solutions

- ✅ Multiple templates per rating
- ✅ Validation mechanisms
- ✅ Error handling
- ✅ Future: Real LLM integration

---

## 🔗 Related Files

- `backend/controllers/reviewController.js` - Main implementation
- `README.md` - Project overview
- `FAKESTORE_SETUP.md` - External API setup

---

**Last Updated: November 2025**

_This document explains how LLM is used in the project for generating product reviews automatically._

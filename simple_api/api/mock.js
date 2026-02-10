const normalizedReviews = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    user: "f4e3d2c1-b5a6-7890-fedc-ba9876543210",
    text: "Incredible noise cancellation and comfortable fit for all-day use.",
    rating: 3,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    user: "c5d6e7f8-a9b0-1234-cdef-567890123456",
    text: "Seamless integration with Apple ecosystem, perfect for iOS users.",
    rating: 5,
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    user: "d6e7f8a9-b0c1-2345-defg-678901234567",
    text: "Crystal clear audio with deep bass, ideal for music enthusiasts.",
    rating: 4,
  },
  {
    id: "d4e5f6a7-b8c9-0123-defg-456789012345",
    user: "f4e3d2c1-b5a6-7890-fedc-ba9876543210",
    text: "Excellent battery life but could be more comfortable for extended wear.",
    rating: 3,
  },
  {
    id: "e5f6a7b8-c9d0-1234-efgh-567890123456",
    user: "c5d6e7f8-a9b0-1234-cdef-567890123456",
    text: "Intuitive touch controls and stable Bluetooth connection.",
    rating: 5,
  },
  {
    id: "f6a7b8c9-d0e1-2345-fghi-678901234567",
    user: "d6e7f8a9-b0c1-2345-defg-678901234567",
    text: "Impressive soundstage and detailed audio reproduction.",
    rating: 4,
  },
  {
    id: "g7b8c9d0-e1f2-3456-ghij-789012345678",
    user: "f4e3d2c1-b5a6-7890-fedc-ba9876543210",
    text: "Premium build quality with exceptional comfort for long sessions.",
    rating: 4,
  },
  {
    id: "h8c9d0e1-f2g3-4567-hijk-890123456789",
    user: "c5d6e7f8-a9b0-1234-cdef-567890123456",
    text: "Fast charging feature is a game-changer for daily use.",
    rating: 5,
  },
  {
    id: "i9d0e1f2-g3h4-5678-ijkl-901234567890",
    user: "d6e7f8a9-b0c1-2345-defg-678901234567",
    text: "Superior noise isolation in busy environments.",
    rating: 4,
  },
  {
    id: "j0e1f2g3-h4i5-6789-jklm-012345678901",
    user: "f4e3d2c1-b5a6-7890-fedc-ba9876543210",
    text: "Great value for money with professional-grade audio.",
    rating: 4,
  },
  {
    id: "k1f2g3h4-i5j6-7890-klmn-123456789012",
    user: "c5d6e7f8-a9b0-1234-cdef-567890123456",
    text: "Lightweight design doesn't compromise on sound quality.",
    rating: 5,
  },
  {
    id: "l2g3h4i5-j6k7-8901-lmno-234567890123",
    user: "d6e7f8a9-b0c1-2345-defg-678901234567",
    text: "Multi-device pairing works flawlessly across phone and laptop.",
    rating: 4,
  },
  {
    id: "m3h4i5j6-k7l8-9012-mnop-345678901234",
    user: "f4e3d2c1-b5a6-7890-fedc-ba9876543210",
    text: "Voice assistant integration works perfectly hands-free.",
    rating: 3,
  },
  {
    id: "n4i5j6k7-l8m9-0123-nopq-456789012345",
    user: "c5d6e7f8-a9b0-1234-cdef-567890123456",
    text: "Compact case with wireless charging capability.",
    rating: 5,
  },
  {
    id: "o5j6k7l8-m9n0-1234-opqr-567890123456",
    user: "d6e7f8a9-b0c1-2345-defg-678901234567",
    text: "Excellent for podcast listening with clear vocal reproduction.",
    rating: 4,
  },
  {
    id: "p6k7l8m9-n0o1-2345-pqrs-678901234567",
    user: "f4e3d2c1-b5a6-7890-fedc-ba9876543210",
    text: "Customizable EQ settings through companion app.",
    rating: 4,
  },
  {
    id: "q7l8m9n0-o1p2-3456-qrst-789012345678",
    user: "c5d6e7f8-a9b0-1234-cdef-567890123456",
    text: "Industry-leading transparency mode for situational awareness.",
    rating: 5,
  },
  {
    id: "r8m9n0o1-p2q3-4567-rsuv-890123456789",
    user: "d6e7f8a9-b0c1-2345-defg-678901234567",
    text: "Durable construction with premium materials throughout.",
    rating: 4,
  },
];

const normalizedUsers = [
  {
    id: "f4e3d2c1-b5a6-7890-fedc-ba9876543210",
    name: "Christopher",
  },
  {
    id: "c5d6e7f8-a9b0-1234-cdef-567890123456",
    name: "Michael",
  },
  {
    id: "d6e7f8a9-b0c1-2345-defg-678901234567",
    name: "Amanda",
  },
];

const normalizedCodecs = [
  { id: "a0b1c2d3-e4f5-6789-abcd-ef0123456789", type: "SBC" },
  { id: "b1c2d3e4-f5a6-7890-bcde-f12345678901", type: "AAC" },
  { id: "c2d3e4f5-a6b7-8901-cdef-234567890123", type: "LDAC" },
  { id: "d3e4f5a6-b7c8-9012-defg-345678901234", type: "aptX" },
  { id: "e4f5a6b7-c8d9-0123-efgh-456789012345", type: "aptX HD" },
  { id: "f5a6b7c8-d9e0-1234-fghi-567890123456", type: "aptX LL" },
];

const normalizedHeadphones = [
  {
    name: "Apple AirPods Pro",
    id: "9a8b7c6d-5e4f-3210-fedc-ba9876543210",
    type: "in-ear",
    maxVolume: "80 dB",
    brand: "Apple",
    reviews: [
      "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "b2c3d4e5-f6a7-8901-bcde-f23456789012",
      "c3d4e5f6-a7b8-9012-cdef-345678901234",
      "g7b8c9d0-e1f2-3456-ghij-789012345678",
    ],
    codecs: [
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
    ],
    img: "/apple-airpods-pro.jpg",
  },
  {
    name: "Sony WF-1000XM3",
    id: "8b7c6d5e-4f3a-2109-edcb-a09876543210",
    type: "true wireless",
    maxVolume: "100 dB",
    brand: "Sony",
    reviews: [
      "d4e5f6a7-b8c9-0123-defg-456789012345",
      "e5f6a7b8-c9d0-1234-efgh-567890123456",
      "f6a7b8c9-d0e1-2345-fghi-678901234567",
      "h8c9d0e1-f2g3-4567-hijk-890123456789",
    ],
    codecs: [
      "c2d3e4f5-a6b7-8901-cdef-234567890123",
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/sony-wf-1000xm3.jpg",
  },
  {
    name: "Sennheiser Momentum 3",
    id: "7c6d5e4f-3a2b-1098-dcba-098765432109",
    type: "on-ear",
    maxVolume: "120 dB",
    brand: "Sennheiser",
    reviews: [
      "i9d0e1f2-g3h4-5678-ijkl-901234567890",
      "j0e1f2g3-h4i5-6789-jklm-012345678901",
      "k1f2g3h4-i5j6-7890-klmn-123456789012",
      "l2g3h4i5-j6k7-8901-lmno-234567890123",
    ],
    codecs: [
      "d3e4f5a6-b7c8-9012-defg-345678901234",
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/sennheiser-momentum-3.jpg",
  },
  {
    name: "Bose QuietComfort 35 II",
    id: "6d5e4f3a-2b1c-0987-cba9-876543210987",
    type: "over-ear",
    maxVolume: "115 dB",
    brand: "Bose",
    reviews: [
      "m3h4i5j6-k7l8-9012-mnop-345678901234",
      "n4i5j6k7-l8m9-0123-nopq-456789012345",
      "o5j6k7l8-m9n0-1234-opqr-567890123456",
      "p6k7l8m9-n0o1-2345-pqrs-678901234567",
    ],
    codecs: [
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/bose-quietcomfort-35-ii.jpg",
  },
  {
    name: "Marshall Major IV",
    id: "5e4f3a2b-1c0d-9876-ba98-765432109876",
    type: "on-ear",
    maxVolume: "99 dB",
    brand: "Marshall",
    reviews: [
      "q7l8m9n0-o1p2-3456-qrst-789012345678",
      "r8m9n0o1-p2q3-4567-rsuv-890123456789",
      "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    ],
    codecs: [
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/marshall-major-iv.jpg",
  },
  {
    name: "Beats Studio 3",
    id: "4f3a2b1c-0d9e-8765-a987-654321098765",
    type: "on-ear",
    maxVolume: "98 dB",
    brand: "Beats",
    reviews: [
      "c3d4e5f6-a7b8-9012-cdef-345678901234",
      "d4e5f6a7-b8c9-0123-defg-456789012345",
      "e5f6a7b8-c9d0-1234-efgh-567890123456",
      "f6a7b8c9-d0e1-2345-fghi-678901234567",
    ],
    codecs: [
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/beats-studio-3.jpg",
  },
  {
    name: "Anker Soundcore Life Q30",
    id: "3a2b1c0d-9e8f-7654-9876-543210987654",
    type: "on-ear",
    maxVolume: "96 dB",
    brand: "Anker",
    reviews: [
      "g7b8c9d0-e1f2-3456-ghij-789012345678",
      "h8c9d0e1-f2g3-4567-hijk-890123456789",
      "i9d0e1f2-g3h4-5678-ijkl-901234567890",
      "j0e1f2g3-h4i5-6789-jklm-012345678901",
    ],
    codecs: [
      "d3e4f5a6-b7c8-9012-defg-345678901234",
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/anker-soundcore-life-q30.jpg",
  },
  {
    name: "Panasonic RZS300WGE",
    id: "2b1c0d9e-8f7a-6543-8765-432109876543",
    type: "true wireless",
    maxVolume: "90 dB",
    brand: "Panasonic",
    reviews: [
      "k1f2g3h4-i5j6-7890-klmn-123456789012",
      "l2g3h4i5-j6k7-8901-lmno-234567890123",
      "m3h4i5j6-k7l8-9012-mnop-345678901234",
      "n4i5j6k7-l8m9-0123-nopq-456789012345",
    ],
    codecs: [
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/panasonic-rzs300wge.jpg",
  },
  {
    name: "Shure AONIC 5",
    id: "1c0d9e8f-7a6b-5432-7654-321098765432",
    type: "closed-back",
    maxVolume: "97 dB",
    brand: "Shure",
    reviews: [
      "o5j6k7l8-m9n0-1234-opqr-567890123456",
      "p6k7l8m9-n0o1-2345-pqrs-678901234567",
      "q7l8m9n0-o1p2-3456-qrst-789012345678",
      "r8m9n0o1-p2q3-4567-rsuv-890123456789",
    ],
    codecs: [
      "f5a6b7c8-d9e0-1234-fghi-567890123456",
      "c2d3e4f5-a6b7-8901-cdef-234567890123",
      "b1c2d3e4-f5a6-7890-bcde-f12345678901",
      "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    ],
    img: "/shure-aonic-5.jpg",
  },
];

module.exports = {
  products: normalizedHeadphones,
  codecs: normalizedCodecs,
  reviews: normalizedReviews,
  users: normalizedUsers,
};

// pick.ts

// pick ফাংশন: একটি অবজেক্ট থেকে নির্দিষ্ট key গুলো নিয়ে নতুন অবজেক্ট তৈরি করে

// <T extends Record<string, unknown>>:
// T হল একটি জেনেরিক টাইপ, যেটা এমন একটি অবজেক্ট যা string কী রাখে এবং তার value
// যে কোনো টাইপ হতে পারে (unknown)। উদাহরণ: { name: "abc", age: 24 }

// <k extends keyof T>:
// k হল T টাইপ অবজেক্টের key-গুলোর মধ্যেকার একটি সাব-টাইপ। অর্থাৎ keys প্যারামিটার যা পাঠানো হচ্ছে,
// তা অবশ্যই obj-এর মধ্যে থাকতে হবে।

const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {} // নতুন অবজেক্ট যেখানে নির্দিষ্ট key গুলো থাকবে

  for (const key of keys) {
    // চেক করা হচ্ছে obj এর মধ্যে ঐ key টা আসলেই আছে কিনা
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key] // থাকলে সেটাকে finalObj তে যোগ করা হচ্ছে
    }
  }

  return finalObj // শেষের রেজাল্ট রিটার্ন  { page: '1', limit: '10' }
}

export default pick

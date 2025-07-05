const dummyData = [
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-01-15",
        products: [
          {
            product_name: "POCO X6 5G",
            product_type: "smartphone",
            quantity: 1,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 12, unit: "months" },
                warranty_end: "2025-01-15",
                warning_date: "2024-12-30"
              }
            ]
          },
          {
            product_name: "Realme Buds Air 5",
            product_type: "earbuds",
            quantity: 2,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 6, unit: "months" },
                warranty_end: "2024-07-15",
                warning_date: "2024-07-01"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2025-01-15",
        products: [
          {
            product_name: "POCO X6 5G",
            product_type: "smartphone",
            quantity: 1,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 12, unit: "months" },
                warranty_end: "2025-01-15",
                warning_date: "2024-12-30"
              }
            ]
          },
          {
            product_name: "Realme Buds Air 5",
            product_type: "earbuds",
            quantity: 2,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 6, unit: "months" },
                warranty_end: "2024-07-15",
                warning_date: "2024-07-01"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-02-12",
        products: [
          {
            product_name: "HP Pavilion 15",
            product_type: "laptop",
            quantity: 1,
            warranties: [
              {
                type: "extended",
                duration: { value: 24, unit: "months" },
                warranty_end: "2026-02-12",
                warning_date: "2026-01-28"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-03-05",
        products: [
          {
            product_name: "Canon EOS 1500D",
            product_type: "camera",
            quantity: 1,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 12, unit: "months" },
                warranty_end: "2025-03-05",
                warning_date: "2025-02-15"
              }
            ]
          },
          {
            product_name: "SanDisk 128GB SD Card",
            product_type: "storage",
            quantity: 2,
            warranties: [
              {
                type: "replacement",
                duration: { value: 12, unit: "months" },
                warranty_end: "2025-03-05",
                warning_date: "2025-02-15"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-04-10",
        products: [
          {
            product_name: "Samsung Galaxy Tab S6",
            product_type: "tablet",
            quantity: 1,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 18, unit: "months" },
                warranty_end: "2025-10-10",
                warning_date: "2025-09-25"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-05-20",
        products: [
          {
            product_name: "Mi TV 5X 50 Inch",
            product_type: "television",
            quantity: 1,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 24, unit: "months" },
                warranty_end: "2026-05-20",
                warning_date: "2026-05-01"
              }
            ]
          },
          {
            product_name: "Amazon Echo Dot",
            product_type: "smart speaker",
            quantity: 3,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 12, unit: "months" },
                warranty_end: "2025-05-20",
                warning_date: "2025-05-01"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-06-14",
        products: [
          {
            product_name: "Lenovo Yoga 9i",
            product_type: "laptop",
            quantity: 1,
            warranties: [
              {
                type: "premium",
                duration: { value: 36, unit: "months" },
                warranty_end: "2027-06-14",
                warning_date: "2027-05-30"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-07-22",
        products: [
          {
            product_name: "Dell Ultrasharp Monitor",
            product_type: "monitor",
            quantity: 2,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 36, unit: "months" },
                warranty_end: "2027-07-22",
                warning_date: "2027-07-01"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-08-10",
        products: [
          {
            product_name: "Logitech MX Master 3S",
            product_type: "accessory",
            quantity: 1,
            warranties: [
              {
                type: "replacement",
                duration: { value: 12, unit: "months" },
                warranty_end: "2025-08-10",
                warning_date: "2025-08-01"
              }
            ]
          },
          {
            product_name: "Dell Inspiron Desktop",
            product_type: "desktop",
            quantity: 1,
            warranties: [
              {
                type: "extended",
                duration: { value: 24, unit: "months" },
                warranty_end: "2026-08-10",
                warning_date: "2026-08-01"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-09-01",
        products: [
          {
            product_name: "Apple MacBook Air M2",
            product_type: "laptop",
            quantity: 2,
            warranties: [
              {
                type: "applecare",
                duration: { value: 24, unit: "months" },
                warranty_end: "2026-09-01",
                warning_date: "2026-08-15"
              }
            ]
          }
        ]
      }
    },
    {
      email: "testuser@example.com",
      arrayofwarranty: {
        order_date: "2024-10-06",
        products: [
          {
            product_name: "Sony WH-1000XM5",
            product_type: "headphones",
            quantity: 2,
            warranties: [
              {
                type: "manufacturer",
                duration: { value: 12, unit: "months" },
                warranty_end: "2025-10-06",
                warning_date: "2025-09-20"
              }
            ]
          }
        ]
      }
    }
  ];
  
  export default dummyData;
  
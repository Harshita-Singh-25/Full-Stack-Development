// src/components/ProgressChart.jsx
export default function ProgressChart() {
  const data = [
    { day: 'Mon', completed: 4, total: 5 },
    { day: 'Tue', completed: 3, total: 5 },
    { day: 'Wed', completed: 5, total: 5 },
    { day: 'Thu', completed: 2, total: 5 },
    { day: 'Fri', completed: 1, total: 5 },
    { day: 'Sat', completed: 0, total: 5 },
    { day: 'Sun', completed: 0, total: 5 },
  ];

  return (
    <div className="h-64">
      <div className="flex items-end h-48 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="relative w-full h-40 flex items-end">
              <div 
                className="w-full bg-indigo-100 rounded-t"
                style={{ height: `${(item.total / 5) * 100}%` }}
              >
                <div 
                  className="bg-indigo-600 rounded-t w-full"
                  style={{ height: `${(item.completed / item.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs mt-2">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        {data.reduce((sum, item) => sum + item.completed, 0)} of {data.reduce((sum, item) => sum + item.total, 0)} goals completed this week
      </div>
    </div>
  );
}
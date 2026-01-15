import Card from "./components/Card";

export default function Home() {
  const testActors = [
    { id: "1", name: "Jhone" },
    { id: "2", name: "Doe" }
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-black min-h-screen">
      <div className="max-w-xs"> {/* Contenedor para limitar el ancho de la card */}
        <Card 
          id="123" 
          title="Super Test Video: Aprendiendo NestJS y Next.js" 
          photoUrl="/data/test.png" 
          actors={testActors} 
        /><Card 
          id="123" 
          title="Super Test Video: Aprendiendo NestJS y Next.js" 
          photoUrl="/data/test.png" 
          actors={testActors} 
        /><Card 
          id="123" 
          title="Super Test Video: Aprendiendo NestJS y Next.js" 
          photoUrl="/data/test.png" 
          actors={testActors} 
        />
      </div>
    </div>
  );
}
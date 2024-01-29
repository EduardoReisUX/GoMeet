interface ButtonProps {
  title: string;
}

export function Button({ title }: ButtonProps) {
  return (
    <button className="bg-primary w-full text-black font-medium rounded-md py-2">
      {title}
    </button>
  );
}

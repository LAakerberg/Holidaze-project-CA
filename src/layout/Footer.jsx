import { AiOutlineCopyrightCircle } from 'react-icons/ai';

export function Footer() {
  return (
    <>
      <footer className="bg-light_salmon h-24 flex">
        <div className="m-auto flex">
          <div>
            <p className="text-black">Holidazy Summer 2023 </p>
          </div>
          <div className="m-auto px-1">
            <AiOutlineCopyrightCircle />
          </div>
        </div>
      </footer>
    </>
  );
}

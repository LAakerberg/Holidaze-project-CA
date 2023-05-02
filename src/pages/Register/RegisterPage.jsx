export function Register() {
  return (
    <>
      <main className="relative flex flex-col w-full md:w-4/5 max-w-screen-2xl px-1 py-6">
        <div>
          <h2>Register account</h2>
        </div>
        <div>
          <div className="backdrop-blur-xl bg-white/30 hover:bg-white h-40 w-full border border-light_salmon p-1 mb-2 flex flex-col transition ease-in-out delay-100 duration-500">
            <div className="flex flex-row p-1">
              <div className="flex-1">
                <p>Form:</p>
                <div>
                  <form>
                    <label>Name:</label>
                    <input />
                  </form>
                </div>
              </div>
              <div className=" flex">Hello x3</div>
            </div>
            <div className="justify-center m-auto">
              <div className="text-center">
                <button className="button primary">View</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

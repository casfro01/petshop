export default function PetForm(){
    return <>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add a New Pet</h1>
                    <p className="py-6">
                        Tell us about your companion to set up their profile. Enter the <b>name</b> and <b>breed</b>, then paste a <b>link</b> to a clear photo hosted online. This information allows us to display your pet across the site and support you with relevant care guidance.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input className="input" placeholder="Name" />
                            <label className="label">Breed</label>
                            <input className="input" placeholder="Breed" />
                            <label className="label">URL</label>
                            <input className="input" placeholder="URL" />
                            <button className="btn btn-neutral mt-4">Submit</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </>
}
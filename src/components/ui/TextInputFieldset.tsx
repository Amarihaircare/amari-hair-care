interface ITextInputFieldset {
  name: string;
}
export default function TextInputFieldset() {
  return (
    <fieldset className="flex flex-col gap-2">
      <label htmlFor="name">{en.name}</label>
      <input
        type="text"
        id="name"
        name="name"
        className="h-12 rounded-md border border-gray-300 px-4"
      />
    </fieldset>
  );
}

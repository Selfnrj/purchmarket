import { ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";

export default function FileDownloader({ url, title, size }) {
  return (
    <div className="flex items-center justify-between border border-transparent border-b-gray-300 p-4">
      <div className="flex items-center">
        <a href={url} target="_blank">
          <DocumentIcon className="mr-2 h-12 w-12 text-red-600" />
        </a>
        <a href={url} target="_blank">
          <b>{title}</b>
        </a>
      </div>
      <a className="flex items-center" href={url} target="_blank" download>
        <ArrowDownTrayIcon className="mr-2 h-6 w-6" />
        Ladda ner
      </a>
    </div>
  );
}

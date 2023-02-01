import Image from "next/image";
import PDFIcon from '../public/PDF.svg'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export default function FileDownloader({ url, title, size }) {
  return (
    <div className="flex items-center justify-between border border-transparent border-b-gray-300 p-4">
      <div className="flex items-center">
        <a href={url} target="_blank">
          <Image
            className="mr-4"
            height={40}
            width={40}
            alt="pdf icon"
            src={PDFIcon}
          />
        </a>
        <a className="mr-48" href={`https://purchwp.azurewebsites.net/${url}`} target="_blank">
          <b>{title}</b>
        </a>
        {size}
      </div>
      <a className="flex items-center" href={`https://purchwp.azurewebsites.net/${url}`} target="_blank" download>
        <ArrowDownTrayIcon className="h-6 w-6 mr-2"/>
        Ladda ner
      </a>
    </div>
  )
}
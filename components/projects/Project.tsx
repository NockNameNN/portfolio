import Image from "next/image"

interface IProject {
    title: string,
    description: string,
    img: string,
    url: Array<{type: string, url: string}>
}

export default function Project({title, description, img, url}: IProject) {
  return (
      <div className="flex text-code flex-col gap-3.5">
          <span className="font-bold text-[#5565E8]">{title}</span>
          <div className="flex flex-col rounded-2xl h-64 w-96 border bg-black-dark">
              <div className="overflow-hidden h-1/2 rounded-t-2xl border">
                  <Image
                      src={img}
                      alt={`project ${title}`}
                      height={1000}
                      width={1000}
                  />
              </div>
              <div className="p-5 flex flex-col justify-between grow border-t">
                  <span className="">{description}</span>
                  <div className="flex gap-5">
                      {url.map(url => (
                          <a
                              href={url.url}
                              key={url.url}
                              target="_blank"
                              className="text-white text-xs px-5 py-1.5 bg-[#1C2B3A] rounded-lg w-fit hover:bg-[#263b50]"
                          >
                              {url.type}
                          </a>
                  ))}
                  </div>
              </div>
          </div>
      </div>
  )
}

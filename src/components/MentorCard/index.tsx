const MentorCard: React.FC = () => {
  return (
    <div className="md:p-2 lg:w-1/3 md:w-1/2 w-full">
      <div className="col-span-1 bg-white rounded-lg shadow hover:opacity-75 hover:shadow hover:-mb-3 md:mx-5 my-3">
        <div className="w-full flex items-center justify-between p-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 flex-grow">
              <h3 className="text-gray-900 text-sm leading-5 font-medium">
                Jane Cooper
              </h3>
            </div>
            <p className="mt-1 text-gray-500 text-sm leading-5">
              Regional Paradigm Technician
            </p>
          </div>
          <img
            className="mx-3 w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
            alt=""
          />
        </div>
        <div className="border-t border-gray-200">
          <div className="-mt-px flex">
            <div className="w-0 flex-1 flex border-r border-gray-200">
              <a
                href="#"
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
              >
                {/* Heroicon name: mail */}
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="ml-3">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;

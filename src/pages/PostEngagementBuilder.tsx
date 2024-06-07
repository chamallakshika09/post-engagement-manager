import NavbarLayout from '../layouts/NavbarLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import TabList from '../components/TabList';
import SelectPost from '../components/SelectPost';
import PostIdUrl from '../components/PostIdUrl';
import Settings from '../components/Settings';
import AutoResponse from '../components/AutoResponse';

const PostEngagementBuilder = () => {
  return (
    <NavbarLayout>
      <Breadcrumbs />
      <div className="mx-6">
        <div aria-label="Card" className="card bg-base-100 p-0 shadow-sm card-bordered">
          <div className="card-body gap-0 p-0">
            <div className="card-title"></div>
            <div className="flex flex-row">
              <TabList
                tabs={[
                  { label: 'Settings', content: <Settings /> },
                  { label: 'Auto Response', content: <AutoResponse /> },
                ]}
                className="basis-2/5"
                tabListClassName="tabs child:!border-b child:!text-sm tabs-bordered tabs-lg"
              />
              <TabList
                tabs={[
                  { label: 'Select A Post', content: <SelectPost /> },
                  { label: 'Post ID / URL', content: <PostIdUrl /> },
                ]}
                className="basis-3/5"
                tabListClassName="tabs h-12 bg-base-100 p-0 child:!rounded-none rounded-b-none border-b border-b-base-300 tabs-boxed tabs-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default PostEngagementBuilder;

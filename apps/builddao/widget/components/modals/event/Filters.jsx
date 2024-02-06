const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const bootstrapTheme = props.bootstrapTheme;

const getCurrentDate = (date, time) => {
  const currentDate = date && time ? new Date(`${date}T${time}`) : new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const [from, setFrom] = useState(props.filters.from || getCurrentDate());
const [to, setTo] = useState(props.filters.to || getCurrentDate());
const [title, setTitle] = useState(props.filters.title || "");
const [location, setLocation] = useState(props.filters.location || "");
const [organizers, setOrganizers] = useState(props.filters.organizers || []);
const [tags, setTags] = useState(props.filters.tags || []);

return (
  <div data-bs-theme={bootstrapTheme}>
    <div className="d-flex align-items-center mb-3" style={{ gap: 24 }}>
      <div className="form-group flex-grow-1">
        <label>From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div className="form-group flex-grow-1">
        <label>To</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
    </div>
    <div className="form-group mb-3">
      <label>Title</label>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label>Location</label>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="organizers">Organizers</label>
      <Typeahead
        id="organizers"
        onChange={(e) => setOrganizers(e)}
        selected={organizers}
        multiple
        labelKey="organizers"
        emptyLabel="Start writing an organizer"
        placeholder="Enter organizers"
        options={[]}
        allowNew
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="tags">Tags</label>
      <Typeahead
        id="tags"
        onChange={(e) => setTags(e)}
        selected={tags}
        multiple
        labelKey="tags"
        emptyLabel="Start writing tags"
        placeholder="Enter tags"
        options={[]}
        allowNew
      />
    </div>
    <div className="d-flex justify-content-end gap-2">
      <Button
        variant="outline"
        onClick={() => {
          setFrom(getCurrentDate());
          setTo(getCurrentDate());
          setTitle("");
          setLocation("");
          setOrganizers([]);
          setTags([]);
        }}
      >
        Clear
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          props.setFilters({
            from,
            to,
            title,
            location,
            organizers,
            tags,
          });
          props.toggleModal();
        }}
      >
        Filter
      </Button>
    </div>
  </div>
);

using System.Collections;

namespace Battleships.Types
{
    public class ShotsMade : IEnumerable<Tuple<GridCoordinates, bool>>
    {
        List<Tuple<GridCoordinates, bool>> _data;


        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<Tuple<GridCoordinates, bool>> GetEnumerator() => _data.GetEnumerator();

        public int Count => _data.Count;

        public Tuple<GridCoordinates, bool> this[int key]
        {
            get => _data[key];
            set => _data[key] = value;
        }

        public List<Tuple<GridCoordinates, bool>> Data => _data;

        public void Add(Tuple<GridCoordinates, bool> obj) => _data.Add(obj);

        public ShotsMade ReturnCopy()
        {
            ShotsMade copy = new ShotsMade(100);
            foreach (var tuple in _data)
                copy.Add(new Tuple<GridCoordinates, bool>(new GridCoordinates(tuple.Item1), tuple.Item2));

            return copy;
        }


        public ShotsMade()
        {
            _data = new List<Tuple<GridCoordinates, bool>>(100);
        }

        public ShotsMade(int size)
        {
            _data = new List<Tuple<GridCoordinates, bool>>(size);
        }

        public ShotsMade(ShotsMade original)
        {
            _data = original.ReturnCopy()._data;
        }
    }
}

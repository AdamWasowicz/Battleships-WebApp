using System.Collections;

namespace Battleships.Types
{
    public class GridsWithShips : IEnumerable<Tuple<GridCoordinates, Ship>>
    {
        List<Tuple<GridCoordinates, Ship>> _data;


        public IEnumerator<Tuple<GridCoordinates, Ship>> GetEnumerator() => _data.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public int Count => _data.Count;

        public Tuple<GridCoordinates, Ship> this[int key]
        {
            get => _data[key];
            set => _data[key] = value;
        }

        public List<Tuple<GridCoordinates, Ship>> Data => _data;


        public void Add(Tuple<GridCoordinates, Ship> obj) => _data.Add(obj);

        public GridsWithShips ReturnCopy()
        {
            GridsWithShips copy = new GridsWithShips(17);
            foreach (var tuple in _data)
                copy.Add(new Tuple<GridCoordinates, Ship>(new GridCoordinates(tuple.Item1), new Ship(tuple.Item2)));
            
            return copy;
        }



        public GridsWithShips()
        {
            _data = new List<Tuple<GridCoordinates, Ship>>(17);
        }

        public GridsWithShips(int size)
        {
            _data = new List<Tuple<GridCoordinates, Ship>>(size);
        }

        public GridsWithShips(GridsWithShips original)
        {
            _data = original.ReturnCopy()._data;
        }
    }
}

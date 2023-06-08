# ws-mem-bench

All tests were made with the server running in a docker container with 512M of ram.

### js-socketio-node:
{
  numberOfRoomsCreated: 4386,
  numberOfClientsConnected: 21930,
  roomCreationTimeAverages: [
    {
      total: 1000,
      averageSinceLast: 4.994400135999995,
      worseSinceLast: 95.641919
    },
    {
      total: 2000,
      averageSinceLast: 4.008416748999997,
      worseSinceLast: 104.049714
    },
    {
      total: 3000,
      averageSinceLast: 3.9295263150000004,
      worseSinceLast: 23.671393
    },
    {
      total: 4000,
      averageSinceLast: 21.640025495000007,
      worseSinceLast: 67.813167
    },
    {
      total: 4386,
      averageSinceLast: 33.272498041450774,
      worseSinceLast: 10204.561356
    }
  ]
}


### js-socketio-bun:
{
  numberOfRoomsCreated: 6967,
  numberOfClientsConnected: 34835,
  roomCreationTimeAverages: [
    {
      total: 1000,
      averageSinceLast: 9.735305483000003,
      worseSinceLast: 160.898554
    },
    {
      total: 2000,
      averageSinceLast: 6.075879674000001,
      worseSinceLast: 91.529642
    },
    {
      total: 3000,
      averageSinceLast: 6.603738190999994,
      worseSinceLast: 87.110659
    },
    {
      total: 4000,
      averageSinceLast: 9.417536748000007,
      worseSinceLast: 364.056954
    },
    {
      total: 5000,
      averageSinceLast: 14.688508419000003,
      worseSinceLast: 419.353965
    },
    {
      total: 6000,
      averageSinceLast: 55.615414001000005,
      worseSinceLast: 346.637952
    },
    {
      total: 6967,
      averageSinceLast: 182.00189906308182,
      worseSinceLast: 6861.995559
    }
  ]
}


### js-socketio-node-uws:
{
  numberOfRoomsCreated: 8110,
  numberOfClientsConnected: 40550,
  roomCreationTimeAverages: [
    {
      total: 1000,
      averageSinceLast: 5.774539214000002,
      worseSinceLast: 125.145965
    },
    {
      total: 2000,
      averageSinceLast: 4.669535635999999,
      worseSinceLast: 60.153579
    },
    {
      total: 3000,
      averageSinceLast: 4.548829925000009,
      worseSinceLast: 16.27632
    },
    {
      total: 4000,
      averageSinceLast: 4.704850968999996,
      worseSinceLast: 77.419098
    },
    {
      total: 5000,
      averageSinceLast: 5.214201941999998,
      worseSinceLast: 23.606827
    },
    {
      total: 6000,
      averageSinceLast: 31.328801798000022,
      worseSinceLast: 209.800512
    },
    {
      total: 7000,
      averageSinceLast: 56.611118842999936,
      worseSinceLast: 184.452681
    },
    {
      total: 8000,
      averageSinceLast: 66.51767769299995,
      worseSinceLast: 522.030408
    },
    {
      total: 8110,
      averageSinceLast: 94.80014236363637,
      worseSinceLast: 708.167764
    }
  ]
}

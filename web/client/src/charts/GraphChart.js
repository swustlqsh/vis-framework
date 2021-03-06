/**
 * Created by liqiusheng on 09/08/2017.
 */
import $ from 'jquery'
let d3 = require('d3')

export default class {
  constructor (el) {
    this.el = el
    this.init()
  }

  init () {
    this.svg = d3.select(this.el).select('svg')
    if (this.svg) {
      this.svg.selectAll('g').remove()
    } else {
      this.svg = d3.select(this.el).append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
    }
    return this
  }

  draw (data) {
    let self = this
    self.svg.selectAll('.graph').remove()
    let container = self.svg.append('g').attr('class', 'graph')

    let width = $(self.el).width()
    let height = $(self.el).height()
    this.height = height
    let zoom = d3.zoom()

    self.svg
		.attr('height', height)
		.attr('width', width)
		.call(zoom.scaleExtent([1 / 10, 10])
            .on('zoom', function zoomed () {
              container.attr('transform', d3.event.transform)
            }))

    let simulation = d3.forceSimulation()
		.force('link', d3.forceLink().id(function (d) { return d.id }))
		.force('charge', d3.forceManyBody())
		.force('center', d3.forceCenter(width / 2, height / 2))

    let link = container.append('g')
		.attr('class', 'links')
		.selectAll('line')
		.data(data.links)
		.enter().append('line')
		.attr('stroke', '#aaa')

    let node = container.append('g')
		.attr('class', 'nodes')
		.selectAll('circle')
		.data(data.nodes)
		.enter().append('circle')
		.attr('r', 2.5)
		.call(d3.drag()
            .on('start', function dragstarted (d) {
              if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart()
              }
              d.fx = d.x
              d.fy = d.y
            })
            .on('drag', function dragged (d) {
              d.fx = d3.event.x
              d.fy = d3.event.y
            })
            .on('end', function dragended (d) {
              if (!d3.event.active) {
                simulation.alphaTarget(0)
              }
              d.fx = null
              d.fy = null
            }))

    node.append('title').text(function (d) {
      return d.id
    })

    simulation
		.nodes(data.nodes)
        .on('tick', function ticked () {
          link
            .attr('x1', function (d) { return d.source.x })
			.attr('y1', function (d) { return d.source.y })
			.attr('x2', function (d) { return d.target.x })
			.attr('y2', function (d) { return d.target.y })

          node
				.attr('cx', function (d) { return d.x })
				.attr('cy', function (d) { return d.y })
        })

    simulation.force('link').links(data.links)

    return this
  }

  update (threshold) {
  }

  on (eventsMap) {
    if (eventsMap.hasOwnProperty('updateThreshold')) this.updateThreshold = eventsMap.updateThreshold
    return this
  }
}
